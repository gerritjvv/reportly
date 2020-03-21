(ns reportly-graph.db.reports)


(def REPORT-DB (atom {}))

(defn get-data-report! [{:keys [id]}]
  (if id
    (get @REPORT-DB id)
    @REPORT-DB))

(defn update-report! [report]
  (let [id (System/currentTimeMillis)
        record (assoc report :id id)]

    (swap! REPORT-DB (fn [v] (assoc v id record)))
    record))