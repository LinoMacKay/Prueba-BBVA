package com.example.demo.controllers;

import com.example.demo.models.ClienteDto;
import com.example.demo.services.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("reto/services/clients")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public ResponseEntity<List<ClienteDto>> getClients() {
        List<ClienteDto> clientes = clienteService.getAllClientes();
        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/{id-client}")
    public ResponseEntity<ClienteDto> getClientById(@PathVariable("id-client") Long id) {
        ClienteDto cliente = clienteService.getClienteById(id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> saveClient(@RequestBody @Valid ClienteDto clienteDto) {
        ClienteDto cliente = clienteService.saveCliente(clienteDto);
        return new ResponseEntity<>(cliente, HttpStatus.CREATED);
    }

    @PutMapping("/{id-client}")
    public ResponseEntity<ClienteDto> updateClient(@PathVariable("id-client") Long id, @RequestBody @Valid ClienteDto clienteDto) {
        ClienteDto cliente = clienteService.updateCliente(clienteDto, id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @DeleteMapping("/{id-client}")
    public ResponseEntity<ClienteDto> deleteClient(@PathVariable("id-client") Long id) {
        ClienteDto cliente = clienteService.deleteCliente(id);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }
}
