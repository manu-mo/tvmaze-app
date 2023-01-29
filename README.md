url Firbase hosting dell'app: https://tvmaze-app-57f32.web.app/

---

Requisiti

- Il progetto sarà implementato sulla base delle API TVMaze e Firebase.
  https://www.tvmaze.com/api
- Il progetto deve avere una autenticazione Firebase UI o implementazione manuale con persistenza local
- Layout mobile-first utilizzando opzionalmente una libreria di componenti (come MUI o Ant) oppure Tailwind CSS
- Non deve essere possibile visitare le pagine dell'app se l'utente non è autenticato
- Il progetto deve integrare TVMaze API per
  - Ricerca show
  - Dettaglio show
- Il progetto deve avere una rotta principale su React Router contenente una schermata in cui è possibile ricercare uno o più show TV
- Il progetto deve avere una rotta secondaria su React Router in cui è possibile visualizzare il dettaglio di uno show TV, aggiungerlo ai preferiti e, opzionalmente, impostarlo come "now watching" (uno solo per utente)
- Opzionalmente, il progetto potrà avere una rotta secondaria su React Router in cui è possibile vedere una classifica degli show più visti tra i "now watching" di tutti gli utenti dell'app
- Il progetto deve integrare Firebase Realtime Database per
- Aggiungere/rimuovere un preferito e gestire molteplici preferiti
- Preferibilmente, dev'essere possibile impostare uno show singolo per utente come "now watching"
- Opzionalmente aggiungere/creare collezioni personali per l'utente
- Le API devono essere implementate in TypeScript classico e gestiti tramite i React Hooks
- I preferiti possono essere opzionalmente salvati su Redux Toolkit
- Opzionalmente è possibile aggiungere la gestione di un tema light/dark tramite implementazione su Redux Toolkit
- Preferibilmente, l'app dovrebbe essere sviluppata in TypeScript ed essere versionata su GIT (GitHub, GitLab o Bitbucket).
