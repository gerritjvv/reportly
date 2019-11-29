(ns reportly-graph.routes.services.graphql
  (:require
    [com.walmartlabs.lacinia.util :refer [attach-resolvers]]
    [com.walmartlabs.lacinia.schema :as schema]
    [com.walmartlabs.lacinia :as lacinia]
    [clojure.data.json :as json]
    [clojure.edn :as edn]
    [clojure.java.io :as io]
    [ring.util.http-response :refer :all]
    [mount.core :refer [defstate]]
    [reportly-graph.queries.datasources :as ds]
    [reportly-graph.queries.tables :as tables]
    [reportly-graph.queries.columns :as columns]))

(defn -read-edn-schema []
  (->
    "graphql/schema.edn"
    io/resource
    slurp
    edn/read-string))

(defn -compile-schema []
  (-> (-read-edn-schema)
      (attach-resolvers {:queries/get-data-sources ds/get-data-sources
                         :DbDataSource/tables      tables/get-data-source-tables
                         :Table/columns            columns/get-table-columns})
      schema/compile))

(defstate compiled-schema
  :start
          (-compile-schema))

(defn execute-request [query]
    (let [vars nil
          context nil]
    (-> (lacinia/execute compiled-schema query vars context)
        (json/write-str))))
