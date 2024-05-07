package com.alura.libreria.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "autores")
public class Autor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int nacimiento;
    private int deceso;

    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Libro> libros;
    public Autor() {
    }

    public Autor(String nombre, int nacimiento, int deceso) {
        this.nombre = nombre;
        this.nacimiento = nacimiento;
        this.deceso = deceso;
    }

    public List<Libro> getLibros() {
        if (libros == null) {
            libros = new ArrayList<>();
        }
        return libros;
    }

    public void setLibros(List<Libro> libros) {
        this.libros = libros;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getNacimiento() {
        return nacimiento;
    }

    public void setNacimiento(int nacimiento) {
        this.nacimiento = nacimiento;
    }

    public int getDeceso() {
        return deceso;
    }

    public void setDeceso(int deceso) {
        this.deceso = deceso;
    }

// Getters and setters

    @Override
    public String toString() {

        return "Autor: " +  nombre + '\n' +
                "Fecha de nacimiento: " + nacimiento +'\n'+
                "Fecha de fallecimiento: " + deceso+'\n'+
                "Libros: "+libros.stream()
                    .map(l->l.getTitulo())
                    .collect(Collectors.toList())+'\n';

    }
}
