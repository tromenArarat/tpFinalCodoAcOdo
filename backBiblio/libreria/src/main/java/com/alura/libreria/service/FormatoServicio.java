package com.alura.libreria.service;

import com.alura.libreria.dto.FormatoDTO;
import com.alura.libreria.model.Formato;
import com.alura.libreria.repository.FormatoRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class FormatoServicio {
    @Autowired
    private FormatoRepository repository;

    public FormatoDTO convierteDatos(Formato formato) {
        return new FormatoDTO(
                        formato.getId(),
                        formato.getTapa()
                );
    }
}
