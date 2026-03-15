'use client';

import { useEffect, useRef, useState } from 'react';
import { getCmsClient } from '@/lib/supabase/cms-client';
import { formatDate } from '@/lib/utils';
import type { MediaAsset } from '@/types/cms';

type ViewMode = 'grid' | 'list';

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MediaAsset | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    const supabase = getCmsClient();
    const { data } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    setAssets((data ?? []) as MediaAsset[]);
    setLoading(false);
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'video/mp4', 'video/webm'];

  async function uploadFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert(`File type "${file.type}" is not allowed. Only images and videos are accepted.`);
      return;
    }

    const supabase = getCmsClient();
    setUploading(true);

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cuedeck-media')
      .upload(filename, file, { contentType: file.type });

    if (uploadError) {
      alert(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('cuedeck-media')
      .getPublicUrl(uploadData.path);

    const { data } = await (supabase.from('media_assets') as any).insert({
      filename: file.name,
      url: publicUrl,
      file_type: file.type.startsWith('image/') ? 'image' : file.type.split('/')[0],
      file_size_kb: Math.round(file.size / 1024),
    }).select().single();

    if (data) setAssets((a) => [data as MediaAsset, ...a]);
    setUploading(false);
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  }

  async function handleDelete(asset: MediaAsset) {
    if (!confirm(`Delete "${asset.filename}"?`)) return;
    const supabase = getCmsClient();
    // Delete from storage — extract path after bucket name
    const bucketMarker = '/object/public/cuedeck-media/';
    const markerIdx = asset.url.indexOf(bucketMarker);
    const path = markerIdx >= 0 ? asset.url.slice(markerIdx + bucketMarker.length) : null;
    if (path) await supabase.storage.from('cuedeck-media').remove([path]);
    // Delete from DB
    await (supabase.from('media_assets') as any).delete().eq('id', asset.id);
    setAssets((a) => a.filter((x) => x.id !== asset.id));
    if (selected?.id === asset.id) setSelected(null);
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
  }

  const filtered = assets.filter(
    (a) => !search || a.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', marginBottom: '4px' }}>Media Library</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{assets.length} assets</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              padding: '10px 20px',
              background: '#4A8EFF',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {uploading ? 'Uploading…' : '+ Upload'}
          </button>
        </div>
      </div>

      {/* Drag + drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        style={{
          border: `2px dashed ${dragging ? '#4A8EFF' : '#1e293b'}`,
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '20px',
          background: dragging ? 'rgba(74,142,255,0.05)' : 'transparent',
          transition: 'all 0.15s',
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div style={{ fontSize: '28px', marginBottom: '8px' }}>⊟</div>
        <div style={{ color: '#64748b', fontSize: '14px' }}>
          Drag and drop files here, or click to browse
        </div>
        <div style={{ color: '#475569', fontSize: '12px', marginTop: '4px' }}>
          Images and videos supported
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by filename…"
          style={{
            flex: 1,
            padding: '8px 14px',
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            color: '#f1f5f9',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['grid', 'list'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '8px 14px',
                background: viewMode === mode ? '#1e293b' : 'transparent',
                border: '1px solid #1e293b',
                borderRadius: '6px',
                color: viewMode === mode ? '#f1f5f9' : '#64748b',
                fontSize: '13px',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {mode === 'grid' ? '⊞' : '≡'} {mode}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Asset grid/list */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>Loading media…</div>
          ) : filtered.length === 0 ? (
            <div style={{ color: '#475569', padding: '40px', textAlign: 'center' }}>No media assets yet.</div>
          ) : viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '12px',
            }}>
              {filtered.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => setSelected(asset)}
                  style={{
                    border: `2px solid ${selected?.id === asset.id ? '#4A8EFF' : '#1e293b'}`,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: '#111827',
                    transition: 'border-color 0.1s',
                  }}
                >
                  {asset.file_type === 'image' ? (
                    <img src={asset.url} alt={asset.alt_text ?? asset.filename} style={{ width: '100%', height: '100px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                      📹
                    </div>
                  )}
                  <div style={{ padding: '8px' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {asset.filename}
                    </div>
                    <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>{asset.file_size_kb} KB</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  {['Preview', 'Filename', 'Type', 'Size', 'Uploaded', ''].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((asset) => (
                  <tr key={asset.id} onClick={() => setSelected(asset)} style={{ borderBottom: '1px solid #1e293b', cursor: 'pointer', background: selected?.id === asset.id ? 'rgba(74,142,255,0.05)' : 'transparent' }}>
                    <td style={{ padding: '10px 14px' }}>
                      {asset.file_type === 'image' && (
                        <img src={asset.url} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      )}
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: '13px', color: '#f1f5f9' }}>{asset.filename}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>{asset.file_type}</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b' }}>{asset.file_size_kb} KB</td>
                    <td style={{ padding: '10px 14px', fontSize: '12px', color: '#64748b' }}>{formatDate(asset.created_at)}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(asset); }} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Preview panel */}
        {selected && (
          <div style={{
            width: '260px',
            flexShrink: 0,
            background: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            position: 'sticky',
            top: '80px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Details</span>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '16px' }}>×</button>
            </div>
            {selected.file_type === 'image' && (
              <img src={selected.url} alt={selected.alt_text ?? ''} style={{ width: '100%', borderRadius: '6px', marginBottom: '12px', objectFit: 'cover', maxHeight: '150px' }} />
            )}
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>{selected.filename}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginBottom: '12px' }}>
              {selected.file_size_kb} KB · {selected.file_type}
              {selected.width && ` · ${selected.width}×${selected.height}px`}
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Alt text</label>
              <input
                defaultValue={selected.alt_text ?? ''}
                placeholder="Describe for accessibility"
                onBlur={async (e) => {
                  const supabase = getCmsClient();
                  await (supabase.from('media_assets') as any).update({ alt_text: e.target.value } as any).eq('id', selected.id);
                }}
                style={{ width: '100%', padding: '6px 8px', background: '#0A0E1A', border: '1px solid #1e293b', borderRadius: '6px', color: '#f1f5f9', fontSize: '12px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              onClick={() => copyUrl(selected.url)}
              style={{ width: '100%', padding: '8px', background: '#4A8EFF', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', marginBottom: '8px' }}
            >
              Copy URL
            </button>
            <button
              onClick={() => handleDelete(selected)}
              style={{ width: '100%', padding: '8px', background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
