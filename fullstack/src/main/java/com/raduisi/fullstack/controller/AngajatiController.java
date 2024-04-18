package com.raduisi.fullstack.controller;

import com.raduisi.fullstack.exceptions.NotFoundException;
import com.raduisi.fullstack.model.Angajati;
import com.raduisi.fullstack.repo.AngajatiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AngajatiController {

    @Autowired
    private AngajatiRepo angajatiRepo;

    @PostMapping("/angajat")
    Angajati newAngajat(@RequestBody Angajati newAngajat)
    {
        return angajatiRepo.save(newAngajat);
    }

    @GetMapping("/angajati")
    List<Angajati> getAllAngajati()
    {
        return angajatiRepo.findAll();
    }

    @GetMapping("/angajat/{id}")
    Angajati getAngajatById(@PathVariable Long id)
    {
        return angajatiRepo.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @PutMapping("/angajat/{id}")
    Angajati updateAngajat(@RequestBody Angajati newAngajat, @PathVariable Long id) {
        return angajatiRepo.findById(id)
                .map(angajati -> {
                    angajati.setCnp(newAngajat.getCnp());
                    angajati.setFunctie(newAngajat.getFunctie());
                    angajati.setNume(newAngajat.getNume());
                    angajati.setPrenume(newAngajat.getPrenume());
                    angajati.setSalariu(newAngajat.getSalariu());
                    return angajatiRepo.save(angajati);
                })
                .orElseThrow(() -> new NotFoundException(id));
    }

    @DeleteMapping("/angajat/{id}")
    String deleteAngajat(@PathVariable Long id)
    {
        if(!angajatiRepo.existsById(id))
        {
            throw new NotFoundException(id);
        }
        angajatiRepo.deleteById(id);
        return "Employee with id "+ id +" deleted.";
    }

}