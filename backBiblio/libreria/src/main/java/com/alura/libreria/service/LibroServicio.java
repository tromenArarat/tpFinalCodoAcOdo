package com.alura.libreria.service;

import com.alura.libreria.dto.LibroDTO;
import com.alura.libreria.model.Libro;
import com.alura.libreria.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibroServicio {
    @Autowired
    private LibroRepository repository;

    public List<LibroDTO> obtenerTodosLosLibros() {
        return convierteDatos(repository.findAll());
    }

    public List<LibroDTO> convierteDatos(List<Libro> libro) {
        return libro.stream()
                .map(l -> new LibroDTO(
                        l.getId(),
                        l.getTitulo(),
                        l.getAutor(),
                        l.getCategoria(),
                        l.getIdioma(),
                        l.getDescargas(),
                        l.getFormato()
                ))
                .collect(Collectors.toList());
    }

    public List<LibroDTO> obtenerLibrosPorCategoria(String nombreCategoria) {
        String categoria = nombreCategoria;
        return convierteDatos(repository.findByCategoria(categoria));
    }
}

/*
public List<SerieDTO> obtenerSeriesPorCategoria(String nombreGenero) {
        Categoria categoria = Categoria.fromEspanol(nombreGenero);
        return convierteDatos(repository.findByGenero(categoria));
    }
 */