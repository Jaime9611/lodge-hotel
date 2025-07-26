package com.lodge.lodge_hotel_restapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;

@Configuration
public class KeyStoreConfig {

    @Value("${keyStore.path}")
    private String keyStorePath;

    @Value("${keyStore.password}")
    private String keyStorePassword;

    @Bean
    public KeyStore keyStore() {
        KeyStore keyStore = null;
        try {
            keyStore = KeyStore.getInstance("JKS");
        } catch (KeyStoreException e) {
            throw new RuntimeException(e);
        }
        try(InputStream keyStoreStream = getClass().getClassLoader().getResourceAsStream(keyStorePath)) {
            if (keyStoreStream == null) {
                throw new RuntimeException("Keystore file not found.");
            }

            keyStore.load(keyStoreStream, keyStorePassword.toCharArray());
        } catch (IOException | NoSuchAlgorithmException | CertificateException e) {
            throw new RuntimeException(e);
        }

        return keyStore;
    }
}
