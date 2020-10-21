import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
} from "react-native";
import { Portal } from "react-native-portalize";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery } from "react-query";
import { QueueBottomSheet } from "../components/QueueBottomSheet";
import { SearchResultsList } from "../components/SearchResultsList";
import { SearchResult } from "../types";

const API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10";
const API_TOKEN = "AIzaSyCrtUmM_inD-Kh0SV2M-ZVWFLzdbBorx0w";

const HomeScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
    remove,
  } = useInfiniteQuery<SearchResult>(
    "search",
    async (key, nextPageToken = "") => {
      console.log("fetching");
      if (searchValue === "") {
        return null;
      }
      const token = `&key=${API_TOKEN}`;
      const q = `&q=${searchValue}`;
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
    setShouldFetch(true);
    setSearchValue(e.nativeEvent.text);
  };

  const handleEndReached = () => {
    fetchMore();
  };

  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40, borderWidth: 1 }}
        onSubmitEditing={handleSubmit}
      />
      <SearchResultsList
        data={data || []}
        handleEndReached={handleEndReached}
      />
      <Portal>
        <QueueBottomSheet />
      </Portal>
    </SafeAreaView>
  );
};

export default HomeScreen;
