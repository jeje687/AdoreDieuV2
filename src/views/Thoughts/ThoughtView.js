// @flow
import React from "react";
import FastImage from "react-native-fast-image";
import { View, FlatList, Animated } from "react-native";
import type { Thought } from "@services/entities/Thought";
import { Button, Card, Title, Paragraph, withTheme } from "react-native-paper";
import LottieView from "lottie-react-native";
import Spinner from "react-native-spinkit";
import { pure } from "recompose";
import styles from "./ThoughtStyles";
import type {
  Props as ContainerProps,
  State as ContainerState
} from "./ThoughtContainer";
import animation from "../../assets/lottie/loading_animation.json";

/**
 * @interface Props
 */
type Props = ContainerState &
  ContainerProps & {
    yPos: number,
    theme: any,
    loadMore: () => void
  };

const keyExtractor = (item: Thought) => item.id;

const Item = pure(({ item }) => (
  <Card
    style={{
      marginBottom: 10,
      borderRadius: 0
    }}
  >
    <FastImage
      style={{ borderRadius: 0, height: 220 }}
      source={{
        uri: item.thumbnail,
        priority: FastImage.priority.normal
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
    <Card.Content>
      <Title style={{ color: "#0c1e32", fontSize: 17 }}>{item.title}</Title>
      <Paragraph>{item.introtext}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Partager</Button>
    </Card.Actions>
  </Card>
));

const renderItem = ({ item }: { item: Thought }) => <Item item={item} />;
const ThoughtView = pure(
  ({ articles, loading, yPos, page, theme, loadMore }: Props) => (
    <View style={styles.container}>
      {loading &&
        page === 1 && (
          <LottieView style={{ flex: 1 }} source={animation} autoPlay loop />
        )}
      {articles && (
        <FlatList
          style={{ flex: 1 }}
          data={articles}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          bounces={false}
        />
      )}
      <Animated.View style={[styles.bottomAnimatedContainer, { bottom: yPos }]}>
        <View style={styles.bottomLoader}>
          <Spinner
            isVisible
            size={50}
            type="ThreeBounce"
            color={theme.colors.primary}
          />
        </View>
      </Animated.View>
    </View>
  )
);

export default withTheme(ThoughtView);
