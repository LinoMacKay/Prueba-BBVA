package com.example.demo.services.impl;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.models.Cliente;
import com.example.demo.models.ClienteDto;
import com.example.demo.repositories.ClienteRepository;
import com.example.demo.services.ClienteService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    private final ModelMapper modelMapper;

    public ClienteServiceImpl(ClienteRepository clienteRepository, ModelMapper modelMapper) {
        this.clienteRepository = clienteRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ClienteDto> getAllClientes() {
        return clienteRepository.findAll().stream().map(cliente -> modelMapper.map(cliente, ClienteDto.class)).toList();
    }

    @Override
    public ClienteDto getClienteById(Long id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cliente", "id", id)
        );
        return modelMapper.map(cliente, ClienteDto.class);
    }

    @Override
    public ClienteDto saveCliente(ClienteDto cliente) {
        Cliente saveCliente = modelMapper.map(cliente, Cliente.class);
        return modelMapper.map(clienteRepository.save(saveCliente), ClienteDto.class);
    }

    @Override
    public ClienteDto updateCliente(ClienteDto cliente, Long id) {
        Cliente updateCliente = clienteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cliente", "id", id)
        );
        updateCliente.setNombres(cliente.getNombres());
        updateCliente.setEdad(cliente.getEdad());
        return modelMapper.map(clienteRepository.save(updateCliente), ClienteDto.class);
    }

    @Override
    public ClienteDto deleteCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cliente", "id", id)
        );
        clienteRepository.deleteById(cliente.getId());
        return modelMapper.map(cliente, ClienteDto.class);
    }
}
