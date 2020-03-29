import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";
import api from "../../services/api";

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, seIncidents] = useState([]);
  const [total, setTotal] = useState("0");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total === incidents.length && total > 0) {
      return;
    }

    setLoading(true);

    const response = await api.get(`incidents?page=${page}`);

    seIncidents([...incidents, ...response.data.incidentsList]);
    setTotal(response.data.conut); //o certo seria ler do header, mas o nos celulares samsung teria q ser https para ler do header
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text style={styles.headerText}>
          Total de <Text styles={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos a baixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents} //função disparada quando o usuario chega no final da lista
        onEndReachedThreshold={0.2} //porcentagem do final da lista q o usuario precisa estar para carregar novos itens
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
