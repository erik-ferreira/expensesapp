import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { VictoryPie } from "victory-native";

import { EXPENSES } from "../utils/expenses";

import { Card, CardProps } from "../components/Card";
import { Header, MonthsProps } from "../components/Header";

import { Container, Chart } from "./styles";

export function Home() {
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [data, setData] = useState<CardProps[]>([]);
  const [categorySelected, setCategorySelected] = useState("");

  function handleCardOnPress(categoryId: string) {
    setCategorySelected((prevState) =>
      prevState === categoryId ? "" : categoryId
    );
  }

  useEffect(() => {
    setData(EXPENSES[month]);
  }, [month]);

  return (
    <Container>
      <Header onValueChange={setMonth} selectedValue={month} />

      <Chart>
        <VictoryPie
          data={data}
          x="label"
          y="value"
          colorScale={data.map((expense) => expense.color)}
          innerRadius={80}
          style={{
            labels: {
              fill: "red",
            },
            data: {
              fillOpacity: ({ datum }) =>
                datum.id === categorySelected || categorySelected === ""
                  ? 1
                  : 0.5,
              stroke: ({ datum }) =>
                datum.id === categorySelected || categorySelected === ""
                  ? datum.color
                  : "none",
            },
          }}
        />
      </Chart>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
