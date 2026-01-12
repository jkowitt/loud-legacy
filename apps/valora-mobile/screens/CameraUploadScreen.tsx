import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { createValuation, uploadPropertyImages } from "../lib/api";
import { valoraTheme } from "../lib/theme";

export const CameraUploadScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const requestCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
    if (status !== "granted") {
      alert("Camera permission is required to capture property photos.");
    }
  };

  const takePhoto = async () => {
    await requestCamera();
    if (hasPermission === false) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7, base64: false });
    if (!result.canceled) {
      setPreviewUri(result.assets[0].uri);
    }
  };

  const pickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.7, base64: false });
    if (!result.canceled) {
      setPreviewUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!previewUri) {
      return;
    }
    try {
      setIsUploading(true);
      const valuationId = await createValuation();
      await uploadPropertyImages(valuationId, previewUri);
      alert("Upload successful");
      setPreviewUri(null);
    } catch (error) {
      // Upload failed
      alert("Upload failed. Check network or server configuration.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture property imagery</Text>
      <Text style={styles.subtitle}>
        Take photos or upload from your library to enrich your valuation request. Media is sent securely to the
        VALORA gateway.
      </Text>

      {previewUri ? (
        <Image source={{ uri: previewUri }} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No photo captured yet</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickFromLibrary}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton, !previewUri ? styles.disabled : undefined]}
        disabled={!previewUri || isUploading}
        onPress={handleUpload}
      >
        {isUploading ? (
          <ActivityIndicator color={valoraTheme.colors.primaryText} />
        ) : (
          <Text style={styles.primaryText}>Upload to Valora</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: valoraTheme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 64
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: valoraTheme.colors.textPrimary
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: valoraTheme.colors.textSecondary
  },
  preview: {
    marginTop: 24,
    borderRadius: 16,
    width: "100%",
    height: 240
  },
  placeholder: {
    marginTop: 24,
    borderRadius: 16,
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: valoraTheme.colors.border,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: valoraTheme.colors.surface
  },
  placeholderText: {
    color: valoraTheme.colors.textSecondary
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24
  },
  button: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: valoraTheme.colors.border,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: valoraTheme.colors.textSecondary,
    fontWeight: "600"
  },
  primaryButton: {
    marginTop: 24,
    backgroundColor: valoraTheme.colors.accent,
    borderColor: "transparent"
  },
  primaryText: {
    color: valoraTheme.colors.primaryText,
    fontWeight: "600"
  },
  disabled: {
    opacity: 0.6
  }
});
