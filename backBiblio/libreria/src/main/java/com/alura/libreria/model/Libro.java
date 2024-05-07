package com.alura.libreria.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.OptionalDouble;

@Entity
@Table(name="libros")
public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "autor_id")
    private Autor autor;
    private String idioma;
    private Double descargas;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "formatos_id")
    private Formato formato;
    public Libro() {
    }
    public Libro(String titulo, Autor autor, List<String> idiomas, Double descargas, Formato formato) {
        this.titulo = titulo;
        this.autor = autor;
        this.idioma = idiomas != null && !idiomas.isEmpty() ? String.join(",", idiomas) : null;
        this.descargas = OptionalDouble.of(descargas).orElse(0);
        this.formato = formato;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public Autor getAutor() {
        return autor;
    }
    public void setAutor(Autor autor) {
        this.autor = autor;
    }
    public String getIdioma() {
        return idioma;
    }
    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }
    public Double getDescargas() {
        return descargas;
    }
    public void setDescargas(Double descargas) {
        this.descargas = descargas;
    }

    public Formato getFormato() {
        return formato;
    }

    public void setFormato(Formato formato) {
        this.formato = formato;
    }

    @Override
    public String toString() {
        return "------ Libro ------" +"\n"+
                "Título: " + titulo + "\n" +
                "Autor: " + autor.getNombre() + "\n" +
                "Idioma: " + idioma + "\n" +
                "Número de descargas: " + descargas + "\n" +
                "Imagen de tapa: " + formato.getTapa() + "\n" +
                "-------------------";
    }
}
