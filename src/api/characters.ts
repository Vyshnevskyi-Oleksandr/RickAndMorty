import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Character, CharacterListResponse } from "../types/character";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

async function fetchCharacters(
  page: number,
  name?: string
): Promise<CharacterListResponse> {
  const params: Record<string, string | number> = { page };
  if (name) params.name = name;
  const { data } = await api.get<CharacterListResponse>("/character", {
    params,
  });
  return data;
}

async function fetchCharacter(id: number): Promise<Character> {
  const { data } = await api.get<Character>(`/character/${id}`);
  return data;
}

export function useCharacters(name: string) {
  return useInfiniteQuery({
    queryKey: ["characters", name],
    queryFn: ({ pageParam }) => fetchCharacters(pageParam, name || undefined),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return undefined;
      const url = new URL(lastPage.info.next);
      return Number(url.searchParams.get("page"));
    },
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
  });
}
