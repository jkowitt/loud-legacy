"use client";

import { useState, useEffect, useRef } from 'react';

interface MediaAsset {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  folder: string;
  tags: string[];
  alt?: string;
  uploadedAt: string;
}

export default function MediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAssets();
  }, [selectedFolder]);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = selectedFolder === 'all'
        ? '/api/media'
        : `/api/media?folder=${selectedFolder}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setAssets(data.assets);
      } else {
        setError('Failed to fetch media assets');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', selectedFolder === 'all' ? 'general' : selectedFolder);

      const response = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        await fetchAssets();
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string, fileName: string) => {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/media?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchAssets();
      } else {
        alert('Failed to delete: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const folders = ['all', 'homepage', 'properties', 'branding', 'documents', 'general'];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>📁 Media Library</h1>
          <p>Manage images, documents, and other media assets</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="button button--primary"
        >
          {uploading ? '⏳ Uploading...' : '📤 Upload File'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.doc,.docx"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Folder Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              style={{
                padding: '0.5rem 1rem',
                border: selectedFolder === folder ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                borderRadius: '6px',
                background: selectedFolder === folder ? 'var(--accent-color)' : 'white',
                color: selectedFolder === folder ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: selectedFolder === folder ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              📁 {folder.charAt(0).toUpperCase() + folder.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: '#fed7d7',
          color: '#c53030',
          borderRadius: '6px',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          Loading media...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {assets.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              background: 'white',
              borderRadius: '8px',
              border: '2px dashed var(--border-color)',
            }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                No media files found. Upload your first file!
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="button button--primary"
              >
                📤 Upload File
              </button>
            </div>
          ) : (
            assets.map((asset) => (
              <div
                key={asset.id}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Preview */}
                <div style={{
                  height: '200px',
                  background: '#f7fafc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                  {asset.mimeType.startsWith('image/') ? (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${asset.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                        {asset.mimeType.includes('pdf') ? '📄' : '📁'}
                      </div>
                      <div style={{ fontSize: '0.75rem' }}>
                        {asset.mimeType.split('/')[1]?.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: '1rem' }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {asset.originalName}
                  </div>

                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                  }}>
                    {formatFileSize(asset.size)} • {asset.folder}
                  </div>

                  {asset.tags && asset.tags.length > 0 && (
                    <div style={{
                      display: 'flex',
                      gap: '0.25rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.75rem',
                    }}>
                      {asset.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            padding: '0.125rem 0.5rem',
                            background: '#edf2f7',
                            borderRadius: '12px',
                            fontSize: '0.625rem',
                            color: '#4a5568',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.75rem',
                  }}>
                    <button
                      onClick={() => copyUrl(asset.url)}
                      style={{
                        flex: 1,
                        padding: '0.375rem',
                        background: '#edf2f7',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                      }}
                    >
                      📋 Copy URL
                    </button>
                    <button
                      onClick={() => setSelectedAsset(asset)}
                      style={{
                        flex: 1,
                        padding: '0.375rem',
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id, asset.fileName)}
                      style={{
                        padding: '0.375rem 0.5rem',
                        background: '#fc8181',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Modal */}
      {selectedAsset && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Edit Media</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                File Name
              </label>
              <input
                type="text"
                value={selectedAsset.fileName}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  background: '#f7fafc',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Alt Text
              </label>
              <input
                type="text"
                value={selectedAsset.alt || ''}
                onChange={(e) => setSelectedAsset({ ...selectedAsset, alt: e.target.value })}
                placeholder="Describe this image for accessibility"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                URL
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={selectedAsset.url}
                  disabled
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    background: '#f7fafc',
                    fontSize: '0.75rem',
                  }}
                />
                <button
                  onClick={() => copyUrl(selectedAsset.url)}
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#edf2f7',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                  }}
                >
                  📋
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedAsset(null)}
                className="button button--secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
