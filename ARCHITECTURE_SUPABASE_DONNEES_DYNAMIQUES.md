# 🗄️ ARCHITECTURE SUPABASE - DONNÉES DYNAMIQUES

## Problème Identifié

Les **dates limites de retrait** changent **à chaque session**. Il faut un système qui permet à Tony de mettre à jour sans coder, et sans risquer de montrer de vieilles infos à l'étudiant.

---

## ✅ Solution: Supabase + Agent Dynamique

L'agent demande la **session de l'étudiant**, puis cherche dans Supabase les dates exactes pour cette session. **Jamais de vieilles infos.**

---

## 📊 Structure de Base de Données

### Table: `dates_limites`

```sql
CREATE TABLE dates_limites (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  session_number INT,  -- 1, 2, 3, 4, 5, 6
  session_name TEXT,   -- "Automne 2025", "Hiver 2026"
  retrait_sans_echec DATE,
  retrait_avec_echec DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Exemple de Données:

```
| session_number | session_name     | retrait_sans_echec | retrait_avec_echec |
|----------------|------------------|--------------------|-------------------|
| 1              | Automne 2025     | 2025-09-21         | 2025-10-12         |
| 2              | Hiver 2026       | 2026-01-22         | 2026-02-15         |
| 3              | Automne 2026     | 2026-09-20         | 2026-10-11         |
| 4              | Hiver 2027       | 2027-01-24         | 2027-02-14         |
| 5              | Automne 2027     | 2027-09-19         | 2027-10-10         |
| 6              | Hiver 2028       | 2028-01-23         | 2028-02-13         |
```

---

## 🤖 Comment l'Agent Répond à Q6

### Flux:

```
Étudiant: "C'est quoi la date limite pour retirer d'un cours?"
↓
Agent: "Bonne question! En quelle session tu es? (1, 2, 3, 4, 5, ou 6?)"
↓
Étudiant: "Je suis en session 2"
↓
Agent cherche dans Supabase:
   SELECT * FROM dates_limites WHERE session_number = 2
↓
Résultat: session_name = "Hiver 2026", retrait_sans_echec = "2026-01-22", etc.
↓
Agent répond:
   "Pour ta session (Hiver 2026):
    📌 Dernier retrait SANS mention d'échec: 22 janvier 2026
    📌 Dernier retrait AVEC mention d'échec: 15 février 2026"
```

---

## 🔧 Comment Tony Met à Jour

**Septembre 2025 (ou quand les dates officielles sortent):**

1. Va sur Supabase Dashboard
2. Ouvre la table `dates_limites`
3. Ajoute les nouvelles sessions OU update les existantes
4. **DONE!** L'agent utilise automatiquement les bonnes dates

**Temps:** ~2 minutes, zéro code

---

## 🛡️ Avantages

✅ **Pas de vieilles infos** - Toujours à jour
✅ **Facile à modifier** - Tony update seul (pas besoin de coder)
✅ **Scalable** - Fonctionne pour 3 ans de programme
✅ **Audit trail** - Historique des mises à jour dans Supabase
✅ **Flexible** - Peut ajouter d'autres champs (dates d'examen, dates de projet, etc.)

---

## 📋 Autres Données Dynamiques à Considérer

Avec le même pattern Supabase, on peut aussi stocker:

```
Table: calendrier_sessions
  - session_number (1-6)
  - session_name ("Automne 2025")
  - date_debut
  - date_fin
  - date_accueil
  - semaine_etudes_debut
  - semaine_etudes_fin
  - date_fin_paiement

Table: logiciels
  - nom
  - categorie (obligatoire, fourni, recommande)
  - lien
  - description

Table: bourses
  - nom
  - type (La Cité, gouvernementale, privée)
  - montant_min
  - montant_max
  - lien
```

---

## 🔐 Permissions Supabase

**Tony (Admin):**
- ✅ Read + Write + Delete sur toutes les tables
- ✅ Gère les données

**Agent (Service):**
- ✅ Read-only sur toutes les tables
- ❌ Pas d'accès Write/Delete (sécurité)

---

## 📝 Dashboard Admin (À Créer Later - Phase 2)

Tony aura accès à un dashboard simple:
- Vue des dates actuelles
- Bouton "Ajouter Session"
- Bouton "Éditer Session"
- Historique des modifications

---

**Statut:** ✅ Approuvé par Tony pour Q6
**Implémentation:** Phase 1 (MVP avec API)
