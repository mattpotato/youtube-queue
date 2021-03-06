import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery } from "react-query";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchResult } from "../types";
import { API_TOKEN } from "../config";

const API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20";

const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, fetchMore, remove } = useInfiniteQuery<SearchResult>(
    "search",
    async (key, nextPageToken = "") => {
      console.log("fetching");
      if (searchValue === "") {
        return null;
      }
      const token = `&key=${API_TOKEN}`;
      const q = `&q=${encodeURIComponent(searchValue)}`;
      let nextPage = "";
      if (nextPage !== nextPageToken) {
        nextPage = `&pageToken=${nextPageToken}`;
      }
      const url = API_URL + token + q + nextPage;
      console.log(url);
      const fetching = fetch(url).then((res) => res.json());

      return fetching;
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      getFetchMore: (lastGroup) => lastGroup?.nextPageToken,
    }
  );

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    remove();
    setSearchValue(e.nativeEvent.text);
  };

  const handleEndReached = () => {
    fetchMore();
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TextInput
          style={styles.inputField}
          onSubmitEditing={handleSubmit}
          placeholder="Search for videos..."
        />
      </View>
      <SearchResultsList
        data={data || []}
        handleEndReached={handleEndReached}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    padding: 8,
  },
  header: {
    backgroundColor: "white",
    margin: 8,
    borderRadius: 8,
  },
});

export default HomeScreen;
