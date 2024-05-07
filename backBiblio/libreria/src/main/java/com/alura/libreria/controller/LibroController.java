package com.alura.libreria.controller;

import com.alura.libreria.dto.LibroDTO;
import com.alura.libreria.service.LibroServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/libros")
public class LibroController {
    @Autowired
    private LibroServicio servicio;

    @GetMapping()
    public List<LibroDTO> obtenerTodosLosLibros(){
        return servicio.obtenerTodosLosLibros();
    }
}
