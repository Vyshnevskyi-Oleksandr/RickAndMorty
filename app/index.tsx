import { useState, useCallback } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useCharacters } from "../src/api/characters";
import CharacterCard from "../src/components/CharacterCard";
import SearchBar from "../src/components/SearchBar";
import EmptyState from "../src/components/EmptyState";
import ErrorState from "../src/components/ErrorState";
import type { Character } from "../src/types/character";

const renderItem = ({ item }: { item: Character }) => (
  <CharacterCard
    id={item.id}
    name={item.name}
    species={item.species}
    status={item.status}
    image={item.image}
  />
);

const keyExtractor = (item: Character) => String(item.id);

export default function ListScreen() {
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(search);

  const characters = data?.pages.flatMap((p) => p.results) ?? [];

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const listFooter = isFetchingNextPage ? (
    <View className="py-6">
      <ActivityIndicator color="#22c55e" />
    </View>
  ) : null;

  return (
    <View className="flex-1 bg-gray-950">
      <Stack.Screen options={{ title: "Rick & Morty" }} />
      <SearchBar onSearch={setSearch} />
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : characters.length === 0 ? (
        <EmptyState />
      ) : (
        <FlashList
          data={characters}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={listFooter}
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 16 }}
        />
      )}
    </View>
  );
}
