package com.raduisi.fullstack.controller;

import com.raduisi.fullstack.exceptions.NotFoundException;
import com.raduisi.fullstack.model.Calatorii;
import com.raduisi.fullstack.repo.CalatoriiRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CalatoriiController {

    @Autowired
    private CalatoriiRepo calatoriiRepo;

    @PostMapping("/calatorie")
    Calatorii newCalatorie(@RequestBody Calatorii newCalatorie)
    {
        return calatoriiRepo.save(newCalatorie);
    }

    @GetMapping("/calatorii")
    List<Calatorii> getAllCalatorii()
    {
        return calatoriiRepo.findAll();
    }

    @GetMapping("/calatorie/{id}")
    Calatorii getCalatorieById(@PathVariable Long id)
    {
        return calatoriiRepo.findById(id)
                .orElseThrow(()->new NotFoundException(id));
    }

    @PutMapping("/calatorie/{id}")
    Calatorii updateCalatorie(@RequestBody Calatorii newCalatorie, @PathVariable Long id) {
        return calatoriiRepo.findById(id)
                .map(calatorii -> {
                    calatorii.setData_plecare(newCalatorie.getData_plecare());
                    calatorii.setData_sosire(newCalatorie.getData_sosire());
                    calatorii.setOra_plecare(newCalatorie.getOra_plecare());
                    calatorii.setOra_sosire(newCalatorie.getOra_sosire());
                    calatorii.setLoc_plecare(newCalatorie.getLoc_plecare());
                    calatorii.setLoc_sosire(newCalatorie.getLoc_sosire());
                    calatorii.setId_transport(newCalatorie.getId_transport());
                    return calatoriiRepo.save(calatorii);
                })
                .orElseThrow(() -> new NotFoundException(id));
    }

    @DeleteMapping("/calatorie/{id}")
    String deleteCalatorie(@PathVariable Long id)
    {
        if(!calatoriiRepo.existsById(id))
        {
            throw new NotFoundException(id);
        }
        calatoriiRepo.deleteById(id);
        return "Journey with id "+ id +" deleted.";
    }

}