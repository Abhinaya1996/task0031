export default function NotFound(){
    return <>
        <div class="maintenance-pages">
            <div class="container-fluid p-0">
                <div class="row">
                    <div class="col-xl-12 align-self-center">
                        <div class="row">
                            <div class="col-md-5 mx-auto">
                                <div class="card p-3 mb-0">
                                    <div class="card-body">
                                        <div class="text-center">
                
                                            <div class="">
                                                <h3 class="mt-5 fw-semibold text-dark text-capitalize">Oops!, Page Not Found</h3>
                                                <p class="text-dark">This pages you are trying to access does not exists.</p>
                                            </div>
                
                                            <a class='btn btn-primary mt-3 me-1' href='/dashboard'>Back to Home</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}