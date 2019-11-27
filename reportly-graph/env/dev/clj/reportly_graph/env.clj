(ns reportly-graph.env
  (:require
    [selmer.parser :as parser]
    [clojure.tools.logging :as log]
    [reportly-graph.dev-middleware :refer [wrap-dev]]))

(def defaults
  {:init
   (fn []
     (parser/cache-off!)
     (log/info "\n-=[reportly-graph started successfully using the development profile]=-"))
   :stop
   (fn []
     (log/info "\n-=[reportly-graph has shut down successfully]=-"))
   :middleware wrap-dev})
