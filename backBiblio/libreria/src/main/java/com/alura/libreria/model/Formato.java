package com.alura.libreria.model;

import jakarta.persistence.*;
@Entity
@Table(name = "formatos")
public class Formato {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String tapa;

        public Formato(){
        }

    public Formato(String tapa) {
        this.tapa = tapa;
    }

    public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTapa() {
            return tapa;
        }

        public void setTapa(String tapa) {
            this.tapa = tapa;
        }


        @Override
        public String toString() {
            return "Formato{" +
                    "id=" + id +
                    ", tapa='" + tapa + '\'' +
                    '}';
        }

}
