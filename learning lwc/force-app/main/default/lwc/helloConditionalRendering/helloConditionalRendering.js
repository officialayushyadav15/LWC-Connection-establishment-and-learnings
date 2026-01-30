<template>
    <lightning-card title="Conditional Rendering">
        <div class="slds-var-m-around_medium">
            <lightning-button
                variant="brand"
                label="Show Data"
                title="Show Data"
                onclick={handleClick}
                class="slds-var-m-left_x-small">
            </lightning-button>

            <template if:true={isVisible}>
                <div>
                    Welcome I am Ayush Yadav Learning LWC
                </div>
            </template>
            <template if:false={isVisible}>
                <div>
                    Data is hidden click on show data
                </div>
            </template>


        <lightning-input type="text" label="Type hello to see data" onkeyup={changeHandler}></lightning-input>

        <template if:true={helloMethod}>
                <div>
                    Your answer is right
                </div>
            </template>
        </div>
    </lightning-card>
</template>
