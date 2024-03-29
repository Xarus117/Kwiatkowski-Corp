export interface UserData {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    centro?: string;
    date?: string;
    password: string;
    imagen?: string;
    puntosSemanales?: number;
    Nivel_responsabilidad?: number;
    Nivel_cooperacion?: number;
    Nivel_autonomia_e_iniciativa?: number;
    Nivel_gestion_emocional?: number;
    Nivel_habilidades_de_pensamiento?: number;
    Puntos_autonomia_e_iniciativa?: number;
    Puntos_cooperacion?: number;
    Puntos_gestion_emocional?: number;
    Puntos_habilidades_de_pensamiento?: number;
    Puntos_responsabilidad?: number;
    puntos_skill?: number;
    skills?: any[];
}