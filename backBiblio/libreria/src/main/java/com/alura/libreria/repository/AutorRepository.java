package com.alura.libreria.repository;

import com.alura.libreria.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AutorRepository extends JpaRepository<Autor,Long> {
    Optional<Autor> findByNombreContainingIgnoreCase(String nombreAutor);
}
