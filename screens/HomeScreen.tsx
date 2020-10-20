import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from "react-redux";
import useSWR, { useSWRInfinite, cache } from "swr";
import { VideoItem } from "../components/VideoItem";
import { RootState } from "../reducers/rootReducer";
import { Item, SearchResult } from "../types";

const API_URL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10";
const API_TOKEN = "AIzaSyCrtUmM_inD-Kh0SV2M-ZVWFLzdbBorx0w";

const fetcher = (...args: any) => {
  console.log("fetching");
  const key = `&key=${API_TOKEN}`;
  const q = `&q=${args[2]}`;
  let nextPage = "";
  if (nextPage !== args[1]) {
    nextPage = `&pageToken=${args[1]}`;
  }
  const url = API_URL + key + q + nextPage;
  console.log(url);
  const fetching = fetch(url).then((res) => res.json());

  return fetching;
};

const HomeScreen = () => {
  const [playing, setPlaying] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: SearchResult | null) => {
      if (!shouldFetch) return null;

      if (searchValue === "") {
        return null;
      }

      if (previousPageData && !previousPageData.items) {
        return null;
      }
      // first page, we don't have `previousPageData`
      if (pageIndex === 0) {
        return ["search", "", searchValue];
      }

      // add the nextPageToken
      return ["search", previousPageData?.nextPageToken, searchValue];
    },
    [searchValue, shouldFetch]
  );

  const { data, size, setSize, error } = useSWRInfinite<SearchResult>(
    getKey,
    fetcher
  );

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setItems([]);
    setShouldFetch(true);
    setSearchValue(e.nativeEvent.text);
  };

  const handleEndReached = () => {
    setSize(size + 1);
    setShouldFetch(true);
  };

  useEffect(() => {
    if (data || error) {
      setShouldFetch(false);
    }
    if (data && data.length && !error) {
      const newData = data[data.length - 1];
      if (newData && newData.items) {
        console.log("adding new items");
        setItems((prevItems) => [...prevItems, ...newData.items]);
      }
    }
  }, [data, error, setShouldFetch, shouldFetch]);

  return (
    <SafeAreaView>
      <TextInput
        style={{ height: 40, borderWidth: 1 }}
        onSubmitEditing={handleSubmit}
      />

      <FlatList
        data={items}
        renderItem={(item) => <VideoItem itemDetails={item.item.snippet} />}
        keyExtractor={(_item, index) => String(index)}
        onEndReached={handleEndReached}
      />
      {/* <Button disabled={!size} title="Load More" onPress={handleEndReached} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;
