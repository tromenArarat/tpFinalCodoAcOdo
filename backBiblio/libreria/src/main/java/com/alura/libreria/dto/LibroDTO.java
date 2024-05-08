package com.alura.libreria.dto;

import com.alura.libreria.model.Autor;
import com.alura.libreria.model.Formato;

public record LibroDTO(
        Long Id,
        String titulo,
        Autor autor,
        String categoria,
        String idioma,
        Double descargas,
        Formato formato

) {
}
