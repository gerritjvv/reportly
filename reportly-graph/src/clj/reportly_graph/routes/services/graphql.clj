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
    [reportly-graph.mutations.datasources :as m-ds]
    [reportly-graph.queries.tables :as tables]
    [reportly-graph.queries.columns :as columns]
    [reportly-graph.queries.data :as data]))

(defn -read-edn-schema []
  (->
    "graphql/schema.edn"
    io/resource
    slurp
    edn/read-string))


(defn -compile-schema []
  (-> (-read-edn-schema)
      (attach-resolvers {:queries/get-data-sources ds/get-data-sources
                         :queries/report-query data/report-query
                         :queries/report-query-poll data/report-query-poll

                         :mutations/test-db-data-source m-ds/test-db-data-source
                         :mutations/save-db-data-source m-ds/save-db-data-source

                         :DbDataSource/tables      tables/get-data-source-tables
                         :Table/columns            columns/get-table-columns})
      schema/compile))

(defstate compiled-schema
  :start
          (-compile-schema))

(defn execute-request [query]
    (let [vars nil
          context nil
          res (-> (lacinia/execute compiled-schema query vars context)
                  (json/write-str))]

      (prn "Got Query: " query)
      (prn "return: " res)

      res))
