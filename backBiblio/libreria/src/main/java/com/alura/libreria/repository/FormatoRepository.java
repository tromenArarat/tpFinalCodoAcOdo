package com.alura.libreria.repository;

import com.alura.libreria.model.Autor;
import com.alura.libreria.model.Formato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormatoRepository extends JpaRepository<Formato,Long> {
}
