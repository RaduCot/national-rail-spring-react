package com.raduisi.fullstack.repo;

import com.raduisi.fullstack.model.Angajati;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AngajatiRepo extends JpaRepository<Angajati, Long> {
}
