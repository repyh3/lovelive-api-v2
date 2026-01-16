'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { JsonViewer } from '@/components/ui/JsonViewer';
import { Group } from '@/lib/types';

type Endpoint = 'groups' | 'idols' | 'songs' | 'lyrics';

export default function Home() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [endpoint, setEndpoint] = useState<Endpoint>('groups');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [lang, setLang] = useState<string>('english');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/groups')
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error('Failed to fetch groups', err));
  }, []);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    let url = `/api/${endpoint}`;

    if (endpoint === 'groups') {
      if (selectedGroup) url += `/${selectedGroup}`;
    } else if (endpoint === 'idols') {
      if (slug) {
        if (selectedGroup) {
          url += `/${selectedGroup}/${slug}`;
        } else {
          url += `/${slug}`;
        }
      } else if (selectedGroup) {
        url += `?group=${selectedGroup}`;
      }
    } else if (endpoint === 'songs') {
      if (selectedGroup) {
        if (slug) {
          url += `/${selectedGroup}/${slug}`;
        } else {
          url += `?group=${selectedGroup}`;
        }
      }
    } else if (endpoint === 'lyrics') {
      if (selectedGroup && slug && lang) {
        url += `/${selectedGroup}/${slug}/${lang}.txt`;
      }
    }

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(data);
      } else {
        const text = await res.text();
        setResponse(text);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-rose-50 p-8 font-sans selection:bg-rose-200 selection:text-rose-900 bg-[radial-gradient(#fecdd3_1px,transparent_1px)] bg-[size:16px_16px]">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="text-center space-y-4 border-b-4 border-black pb-6 flex flex-col items-center">
          <img
            src="/assets/logo.png"
            alt="Love Live! API"
            width={512}
            height={256}
            className="object-contain transform hover:scale-105 transition-transform drop-shadow-md"
          />
          <p className="text-xl font-bold text-gray-600 tracking-wide uppercase">
            Playground
          </p>

          <div className="bg-yellow-100 border-2 border-gray-600 text-gray-600 px-4 py-2 text-sm font-bold shadow-sm rounded-lg max-w-lg flex items-center gap-2">
            <span>⚠️</span>
            <span>NOTICE: Data from <span className="underline decoration-wavy font-black">IkizuLive</span> group is still being added. The API is currently in development.</span>
          </div>
        </div>

        <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          </div>

          <Select
            label="Endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value as Endpoint)}
          >
            <option value="groups">Groups</option>
            <option value="idols">Idols</option>
            <option value="songs">Songs</option>
            <option value="lyrics">Lyrics</option>
          </Select>

          <Select
            label="Group (Optional/Required)"
            value={endpoint === 'idols' ? '' : selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            disabled={endpoint === 'idols'}
            className={endpoint === 'songs' || endpoint === 'lyrics' ? "border-rose-500 ring-2 ring-rose-200" : ""}
          >
            {(endpoint === 'groups') && (
              <option value="">-- All / None --</option>
            )}

            {groups.map(g => {
              const slug = namesSafe(g.name);
              const isRestricted = endpoint === 'songs' || endpoint === 'lyrics';
              const allowed = ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'];

              if (isRestricted && !allowed.includes(slug)) return null;

              return <option key={slug} value={slug}>{g.name}</option>
            })}

            {(!['songs', 'lyrics'].includes(endpoint) || ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'].includes('aqours')) && <option value="aqours">Aqours</option>}
            {(!['songs', 'lyrics'].includes(endpoint) || ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'].includes('muse')) && <option value="muse">μ's (muse)</option>}
            {(!['songs', 'lyrics'].includes(endpoint) || ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'].includes('liella')) && <option value="liella">Liella!</option>}
            {(!['songs', 'lyrics'].includes(endpoint) || ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'].includes('nijigasaki')) && <option value="nijigasaki">Nijigasaki</option>}
            {(!['songs', 'lyrics'].includes(endpoint) || ['aqours', 'muse', 'liella', 'hasunosora', 'nijigasaki'].includes('hasunosora')) && <option value="hasunosora">Hasunosora</option>}

            {(!['songs', 'lyrics'].includes(endpoint)) && (
              <>
                <option value="a-rise">A-Rise</option>
                <option value="saint-snow">Saint Snow</option>
                <option value="sunny-passion">Sunny Passion</option>
              </>
            )}
          </Select>

          {(endpoint !== 'groups') && (
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 ml-1">
                Slug / ID
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. chika-takami, 1star"
                className="w-full bg-white border-2 border-black px-4 py-2 font-bold text-gray-800 focus:outline-none focus:border-rose-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] placeholder:font-normal"
              />
            </div>
          )}

          {endpoint === 'lyrics' && (
            <Select
              label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="english">English</option>
              <option value="romaji">Romaji</option>
              <option value="kanji">Kanji</option>
            </Select>
          )}

          <div className="md:col-span-2 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="w-full md:w-auto"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Send Request'}
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-black p-4 text-red-600 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            ERROR: {error}
          </div>
        )}

        {response && (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black uppercase italic">Response Data</h3>
            <JsonViewer data={response} />
          </div>
        )}

        <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="https://github.com/repyh3/lovelive-api-v2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 font-black uppercase text-sm hover:bg-rose-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[1px] active:shadow-none"
          >
            ⭐ on GitHub
          </a>
        </div>

        <footer className="mt-8 border-t-2 border-black/10 pt-8 text-center">
          <p className="text-sm font-bold flex items-center justify-center gap-2 text-gray-600">
            Made by Repyh
          </p>
        </footer>

      </div>
    </main>
  );
}

function namesSafe(name: string) {
  if (name === "μ's") return 'muse';

  return name.toLowerCase()
    .replace(/[!・]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
