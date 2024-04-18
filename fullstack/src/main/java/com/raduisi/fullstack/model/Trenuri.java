package com.raduisi.fullstack.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Trenuri {
    @Id
    @GeneratedValue
    private long id;
    private int vagoane;
    private float masa;
    private float v_max;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getVagoane() {
        return vagoane;
    }

    public void setVagoane(int vagoane) {
        this.vagoane = vagoane;
    }

    public float getMasa() {
        return masa;
    }

    public void setMasa(float masa) {
        this.masa = masa;
    }

    public float getV_max() {
        return v_max;
    }

    public void setV_max(float v_max) {
        this.v_max = v_max;
    }
}
