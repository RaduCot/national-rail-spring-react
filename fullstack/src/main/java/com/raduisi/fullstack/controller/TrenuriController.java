package com.raduisi.fullstack.controller;

import com.raduisi.fullstack.exceptions.NotFoundException;
import com.raduisi.fullstack.model.Trenuri;
import com.raduisi.fullstack.repo.TrenuriRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class TrenuriController {

    @Autowired
    private TrenuriRepo trenuriRepo;

    @PostMapping("/tren")
    Trenuri newTren(@RequestBody Trenuri newTren)
    {
        return trenuriRepo.save(newTren);
    }

    @GetMapping("/trenuri")
    List<Trenuri> getAllTrenuri()
    {
        return trenuriRepo.findAll();
    }

    @GetMapping("/tren/{id}")
    Trenuri getTrenById(@PathVariable Long id)
    {
        return trenuriRepo.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @PutMapping("/tren/{id}")
    Trenuri updateTren(@RequestBody Trenuri newTren, @PathVariable Long id) {
        return trenuriRepo.findById(id)
                .map(trenuri -> {
                    trenuri.setVagoane(newTren.getVagoane());
                    trenuri.setMasa(newTren.getMasa());
                    trenuri.setV_max(newTren.getV_max());
                    return trenuriRepo.save(trenuri);
                })
                .orElseThrow(() -> new NotFoundException(id));
    }

    @DeleteMapping("/tren/{id}")
    String deleteTren(@PathVariable Long id)
    {
        if(!trenuriRepo.existsById(id))
        {
            throw new NotFoundException(id);
        }
        trenuriRepo.deleteById(id);
        return "Employee with id "+ id +" deleted.";
    }

}