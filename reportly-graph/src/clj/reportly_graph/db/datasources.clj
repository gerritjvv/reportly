(ns reportly-graph.db.datasources)


(def DS-DB (atom [{:id       "uuid123323"
                   :name     "Test1"
                   :type     :DB
                   :user     "test"
                   :password "1234"
                   :db_type  :POSTGRES
                   :url      "localhost"
                   :port     5432
                   :ssl      true
                   }
                  {:id       "uuidabc"
                   :name     "Test2"
                   :type     :DB
                   :user     "test"
                   :password "1234"
                   :db_type  :POSTGRES
                   :url      "localhost"
                   :port     5432
                   :ssl      true
                   }]))

(defn get-data-sources! [{:keys [id]}]
  @DS-DB)

(defn update-ds! [data-source]
  {:pre [(#{:DB :API} (:type data-source))]}

  (let [id (System/currentTimeMillis)
        record (assoc data-source :id id)]

    (swap! DS-DB (fn [v] (conj v record)))
    record))