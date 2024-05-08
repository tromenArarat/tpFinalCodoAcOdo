package com.alura.libreria.repository;

import com.alura.libreria.model.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LibroRepository extends JpaRepository<Libro,Long> {
    Optional<Libro> findByTituloContainingIgnoreCase(String nombreLibro);
    List<Libro> findByCategoria(String categoria);
}