import fs from 'node:fs/promises';
import path from 'node:path';
import { Group, Idol, Song } from './types';

const DATA_DIR = path.join(process.cwd(), 'api-v2');

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    return null;
  }
}

async function getFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

export async function getGroups(): Promise<Group[]> {
  const dir = path.join(DATA_DIR, 'group');
  const files = await getFiles(dir);
  const groups = await Promise.all(
    files.map((file) => readJson<Group>(path.join(dir, file)))
  );
  return groups.filter((g): g is Group => g !== null);
}

export async function getGroup(slug: string): Promise<Group | null> {
  const filePath = path.join(DATA_DIR, 'group', `${slug}.json`);
  return readJson<Group>(filePath);
}

export async function getIdols(group: string): Promise<Idol[]> {
  const dir = path.join(DATA_DIR, 'idol', group);
  const files = await getFiles(dir);
  const idols = await Promise.all(
    files.map((file) => readJson<Idol>(path.join(dir, file)))
  );
  return idols.filter((i): i is Idol => i !== null);
}

export async function getAllIdols(): Promise<Idol[]> {
  const idolDir = path.join(DATA_DIR, 'idol');
  let groupDirs: string[] = [];
  try {
    groupDirs = (await fs.readdir(idolDir, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }

  const allIdolsNested = await Promise.all(
    groupDirs.map((slug) => getIdols(slug))
  );
  return allIdolsNested.flat();
}

export async function getIdol(
  group: string,
  slug: string
): Promise<Idol | null> {
  const filePath = path.join(DATA_DIR, 'idol', group, `${slug}.json`);
  return readJson<Idol>(filePath);
}

export async function findIdol(slug: string): Promise<Idol | null> {
  const idolDir = path.join(DATA_DIR, 'idol');
  let groupDirs: string[] = [];
  try {
    groupDirs = (await fs.readdir(idolDir, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return null;
  }

  for (const group of groupDirs) {
    const idol = await getIdol(group, slug);
    if (idol) return idol;
  }
  return null;
}

export async function getSongs(group: string): Promise<Song[]> {
  const dir = path.join(DATA_DIR, 'song_meta', group);
  const files = await getFiles(dir);
  const songs = await Promise.all(
    files.map((file) => readJson<Song>(path.join(dir, file)))
  );
  return songs.filter((s): s is Song => s !== null);
}

export async function getSong(
  group: string,
  slug: string
): Promise<Song | null> {
  const filePath = path.join(DATA_DIR, 'song_meta', group, `${slug}.json`);
  return readJson<Song>(filePath);
}

export async function getLyrics(
  group: string,
  slug: string,
  lang: string
): Promise<string | null> {
  try {
    const filePath = path.join(
      DATA_DIR,
      'data',
      'lyrics',
      group,
      slug,
      `${lang}.txt`
    );
    const text = await fs.readFile(filePath, 'utf-8');
    return text;
  } catch {
    return null;
  }
}
