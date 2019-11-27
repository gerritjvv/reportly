(ns reportly-graph.middleware
  (:require
    [reportly-graph.env :refer [defaults]]
    [reportly-graph.config :refer [env]]
    [ring-ttl-session.core :refer [ttl-memory-store]]
    [ring.middleware.defaults :refer [site-defaults wrap-defaults]]))

(defn wrap-base [handler]
  (-> ((:middleware defaults) handler)
      (wrap-defaults
        (-> site-defaults
            (assoc-in [:security :anti-forgery] false)
            (assoc-in  [:session :store] (ttl-memory-store (* 60 30)))))))
