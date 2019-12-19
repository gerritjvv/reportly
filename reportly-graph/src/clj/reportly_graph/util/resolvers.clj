(ns reportly-graph.util.resolvers
  (:require
    [com.walmartlabs.lacinia.resolve :refer [resolve-as ResolverResult]]
    [clojure.spec.alpha :as s]))


;;; Resolvers helpers allows us to write a graphql function that expects a input object of a single name
;;; validates it against a clojure spec
;;; if any exception a ResolverResult is returned
;;; see https://lacinia.readthedocs.io/en/latest/resolve/resolve-as.html


(defn wrapper [input-spec input-arg-key resolver]
  {:pre [input-spec (keyword input-arg-key) (fn? resolver)]}
  (fn [context args value]
    (try

      (let [input (get args input-arg-key)]

        (if-not (s/valid? input-spec input)
          (throw
            (ex-info "Invalid Input"
                     {:message (s/explain-str input-spec input)}))
          (resolver context args value)))

      (catch Exception e
        (let [{:keys [message]} (ex-data e)]
          (resolve-as nil (if message
                            {:message message}
                            {:message (str e)}
                            )))))))