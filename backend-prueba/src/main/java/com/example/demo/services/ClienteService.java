package com.example.demo.services;

import com.example.demo.models.ClienteDto;

import java.util.List;

public interface ClienteService {
    List<ClienteDto> getAllClientes();

    ClienteDto getClienteById(Long id);

    ClienteDto saveCliente(ClienteDto cliente);

    ClienteDto updateCliente(ClienteDto cliente, Long id);

    ClienteDto deleteCliente(Long id);
}
