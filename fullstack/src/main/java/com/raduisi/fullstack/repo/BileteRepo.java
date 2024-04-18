package com.raduisi.fullstack.repo;

import com.raduisi.fullstack.model.Bilete;
import org.springframework.data.jpa.repository.JpaRepository;
public interface BileteRepo extends JpaRepository<Bilete, Long> {
}
