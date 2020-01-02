(ns reportly-graph.schema.datasources
  (:require [clojure.spec.alpha :as s]))

(def DB-TYPES #{:POSTGRES
                :MYSQL
                :ATHENA})

(s/def ::name string?)
(s/def ::db_type DB-TYPES)
(s/def ::user string?)
(s/def ::password string?)
(s/def ::url string?)

(s/def ::ssl boolean?)

(s/def ::DBDataSourceInput (s/keys :req-un [::name
                                            ::db_type
                                            ::user
                                            ::password
                                            ::url
                                            ::port
                                            ::ssl]))