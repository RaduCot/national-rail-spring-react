package com.raduisi.fullstack.controller;

import com.raduisi.fullstack.exceptions.NotFoundException;
import com.raduisi.fullstack.model.Bilete;
import com.raduisi.fullstack.repo.BileteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class BileteController {

    @Autowired
    private BileteRepo bileteRepo;

    @PostMapping("/bilet")
    Bilete newBilet(@RequestBody Bilete newBilet)
    {
        return bileteRepo.save(newBilet);
    }

    @GetMapping("/bilete")
    List<Bilete> getAllBilete()
    {
        return bileteRepo.findAll();
    }

    @GetMapping("/bilet/{id}")
    Bilete getBiletById(@PathVariable Long id)
    {
        return bileteRepo.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @PutMapping("/bilet/{id}")
    Bilete updateBilet(@RequestBody Bilete newBilet, @PathVariable Long id) {
        return bileteRepo.findById(id)
                .map(bilete -> {
                    bilete.setClasa(newBilet.getClasa());
                    bilete.setData_emitenta(newBilet.getData_emitenta());
                    bilete.setLoc(newBilet.getLoc());
                    bilete.setVagon(newBilet.getVagon());
                    bilete.setPret(newBilet.getPret());
                    bilete.setTip_discount(newBilet.getTip_discount());
                    bilete.setId_calatorie(newBilet.getId_calatorie());
                    bilete.setId_angajat(newBilet.getId_angajat());
                    return bileteRepo.save(bilete);
                })
                .orElseThrow(() -> new NotFoundException(id));
    }

    @DeleteMapping("/bilet/{id}")
    String deleteBilet(@PathVariable Long id)
    {
        if(!bileteRepo.existsById(id))
        {
            throw new NotFoundException(id);
        }
        bileteRepo.deleteById(id);
        return "Ticket with id "+ id +" deleted.";
    }

}