package com.alura.libreria;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibreriaApplicationWeb {
    public static void main(String[] args) {

        SpringApplication.run(LibreriaApplicationWeb.class, args);
        System.out.println("Gracias por el dato");
    }
}
