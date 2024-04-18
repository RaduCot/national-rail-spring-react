package com.raduisi.fullstack.controller;

import com.raduisi.fullstack.exceptions.NotFoundException;
import com.raduisi.fullstack.model.Transporturi;
import com.raduisi.fullstack.repo.TransporturiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class TransporturiController {

    @Autowired
    private TransporturiRepo transporturiRepo;

    @PostMapping("/transport")
    Transporturi newTransport(@RequestBody Transporturi newTransport)
    {
        return transporturiRepo.save(newTransport);
    }

    @GetMapping("/transporturi")
    List<Transporturi> getAllTransporturi()
    {
        return transporturiRepo.findAll();
    }

    @GetMapping("/transport/{id}")
    Transporturi getTransportById(@PathVariable Long id)
    {
        return transporturiRepo.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @PutMapping("/transport/{id}")
    Transporturi updateTransport(@RequestBody Transporturi newTransport, @PathVariable Long id) {
        return transporturiRepo.findById(id)
                .map(transporturi -> {
                    transporturi.setTip(newTransport.getTip());
                    transporturi.setLocuri(newTransport.getLocuri());
                    transporturi.setSpecificatii(newTransport.getSpecificatii());
                    transporturi.setId_tren(newTransport.getId_tren());
                    transporturi.setId_angajat(newTransport.getId_angajat());
                    return transporturiRepo.save(transporturi);
                })
                .orElseThrow(() -> new NotFoundException(id));
    }

    @DeleteMapping("/transport/{id}")
    String deleteTransport(@PathVariable Long id)
    {
        if(!transporturiRepo.existsById(id))
        {
            throw new NotFoundException(id);
        }
        transporturiRepo.deleteById(id);
        return "Transport with id "+ id +" deleted.";
    }

}