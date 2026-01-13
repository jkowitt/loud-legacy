"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CMSContent {
  id: string;
  key: string;
  value: string;
  type: 'TEXT' | 'HTML' | 'MARKDOWN' | 'JSON';
  section: string;
  updatedAt: string;
}

export default function CMSPage() {
  const router = useRouter();
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [editingContent, setEditingContent] = useState<CMSContent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // New content form state
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<'TEXT' | 'HTML' | 'MARKDOWN' | 'JSON'>('TEXT');
  const [newSection, setNewSection] = useState('general');

  useEffect(() => {
    fetchContents();
  }, [selectedSection]);

  const fetchContents = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = selectedSection === 'all'
        ? '/api/cms'
        : `/api/cms?section=${selectedSection}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setContents(data.content);
      } else {
        setError('Failed to fetch CMS content');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: CMSContent) => {
    setEditingContent(content);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setNewKey('');
    setNewValue('');
    setNewType('TEXT');
    setNewSection('general');
    setIsCreating(true);
    setEditingContent(null);
  };

  const handleSave = async () => {
    if (!editingContent) return;

    setIsSaving(true);
    try {
      const response = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingContent),
      });

      const data = await response.json();

      if (data.success) {
        await fetchContents();
        setEditingContent(null);
      } else {
        alert('Failed to save: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateSave = async () => {
    if (!newKey || !newValue) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: newKey,
          value: newValue,
          type: newType,
          section: newSection,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchContents();
        setIsCreating(false);
      } else {
        alert('Failed to create: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Are you sure you want to delete "${key}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/cms?key=${key}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchContents();
      } else {
        alert('Failed to delete: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const sections = ['all', 'homepage', 'valora', 'footer', 'dashboard', 'general'];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>🎨 CMS Management</h1>
          <p>Manage site content, text, and media assets</p>
        </div>
        <button
          onClick={handleCreate}
          className="button button--primary"
        >
          + Create New Content
        </button>
      </div>

      {/* Section Filter */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              style={{
                padding: '0.5rem 1rem',
                border: selectedSection === section ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                borderRadius: '6px',
                background: selectedSection === section ? 'var(--accent-color)' : 'white',
                color: selectedSection === section ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: selectedSection === section ? '600' : '400',
                transition: 'all 0.2s',
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
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
          Loading content...
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>Key</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>Value Preview</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>Section</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', fontSize: '0.875rem' }}>Last Updated</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', fontSize: '0.875rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No content found. Create your first content item!
                  </td>
                </tr>
              ) : (
                contents.map((content) => (
                  <tr key={content.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontFamily: 'monospace', color: '#4a5568' }}>
                      {content.key}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', maxWidth: '300px' }}>
                      <div style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {content.value}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        background: '#edf2f7',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                      }}>
                        {content.type}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                      {content.section}
                    </td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {new Date(content.updatedAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(content)}
                          style={{
                            padding: '0.375rem 0.75rem',
                            background: '#4299e1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(content.key)}
                          style={{
                            padding: '0.375rem 0.75rem',
                            background: '#fc8181',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingContent && (
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
            maxWidth: '700px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Edit Content</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Content Key
              </label>
              <input
                type="text"
                value={editingContent.key}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  background: '#f7fafc',
                  fontFamily: 'monospace',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Content Value
              </label>
              <textarea
                value={editingContent.value}
                onChange={(e) => setEditingContent({ ...editingContent, value: e.target.value })}
                rows={8}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '6px',
                  fontFamily: editingContent.type === 'TEXT' ? 'inherit' : 'monospace',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Type
                </label>
                <select
                  value={editingContent.type}
                  onChange={(e) => setEditingContent({ ...editingContent, type: e.target.value as any })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                >
                  <option value="TEXT">Text</option>
                  <option value="HTML">HTML</option>
                  <option value="MARKDOWN">Markdown</option>
                  <option value="JSON">JSON</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Section
                </label>
                <input
                  type="text"
                  value={editingContent.section}
                  onChange={(e) => setEditingContent({ ...editingContent, section: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditingContent(null)}
                disabled={isSaving}
                className="button button--secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="button button--primary"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
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
            maxWidth: '700px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Create New Content</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Content Key *
              </label>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g., homepage_hero_title"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                Content Value *
              </label>
              <textarea
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                rows={6}
                placeholder="Enter content value..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '6px',
                  fontFamily: newType === 'TEXT' ? 'inherit' : 'monospace',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                >
                  <option value="TEXT">Text</option>
                  <option value="HTML">HTML</option>
                  <option value="MARKDOWN">Markdown</option>
                  <option value="JSON">JSON</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
                  Section
                </label>
                <input
                  type="text"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  placeholder="e.g., homepage"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsCreating(false)}
                disabled={isSaving}
                className="button button--secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSave}
                disabled={isSaving}
                className="button button--primary"
              >
                {isSaving ? 'Creating...' : 'Create Content'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
