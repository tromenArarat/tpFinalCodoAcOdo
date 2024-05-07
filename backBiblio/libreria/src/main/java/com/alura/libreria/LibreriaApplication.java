package com.alura.libreria;

import com.alura.libreria.principal.Principal;
import com.alura.libreria.repository.AutorRepository;
import com.alura.libreria.repository.FormatoRepository;
import com.alura.libreria.repository.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LibreriaApplication implements CommandLineRunner {
	@Autowired
	private LibroRepository repository;

	@Autowired
	private AutorRepository repository2;

	@Autowired
	private FormatoRepository repository3;
	public static void main(String[] args) {
		SpringApplication.run(LibreriaApplication.class, args);

	}
	@Override
	public void run(String... args) throws Exception {
		Principal principal = new Principal(repository, repository2,repository3);
		principal.muestraElMenu();

	}


}
