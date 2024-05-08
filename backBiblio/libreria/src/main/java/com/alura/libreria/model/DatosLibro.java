package com.alura.libreria.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record DatosLibro(
    @JsonAlias("title") String titulo,
    @JsonAlias("name") Autor autor,
    @JsonAlias("bookshelves") List<String> categoria,
    @JsonAlias("languages") List<String> idioma,
    @JsonAlias("download_count") Double descargas,
    @JsonAlias("image/jpeg") Formato formato){
}
