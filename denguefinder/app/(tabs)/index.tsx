import { Button, StyleSheet, Text, View, Modal, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPage, setModalPage] = useState(0);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  const modalContent = [
    {
      text: "Este aplicativo usa a câmera para detectar possíveis criadouros de dengue.",
      image: require("@/assets/images/camera.png"), // Substitua pelo caminho correto da imagem
    },
    {
      text: "Aponte a câmera para um objeto e o aplicativo indicará se ele é um possível criadouro.",
      image: require("@/assets/images/criadouro.png"), // Substitua pelo caminho correto da imagem
    },
    {
      text: "Certifique-se de conceder permissões de câmera para usar o aplicativo.",
      image: require("@/assets/images/permission.png"), // Substitua pelo caminho correto da imagem
    },
  ];

  const handleNext = () => {
    if (modalPage < modalContent.length - 1) {
      setModalPage(modalPage + 1);
    } else {
      setModalVisible(false);
    }
  };

  const handlePrev = () => {
    if (modalPage > 0) {
      setModalPage(modalPage - 1);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back"></CameraView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalContent[modalPage].text}</Text>
            <Image source={modalContent[modalPage].image} style={styles.modalImage} />
            <View style={styles.modalNavigation}>
              {modalPage > 0 && (
                <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>{"<"}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                <Text style={styles.arrowText}>{modalPage < modalContent.length - 1 ? ">" : "Fechar"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  modalNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
